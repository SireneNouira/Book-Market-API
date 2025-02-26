<?php

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\RegisterUserDto;
use App\Entity\User;
use App\Entity\Vendeur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class UserDataPersister implements ProcessorInterface
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHasher
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): User
    {
        if (!$data instanceof RegisterUserDto) {
            throw new \InvalidArgumentException('Invalid data type');
        }


        // On choisit quelle entité créer
        if ($data->type === 'vendeur') {
            // Vérification que les champs nécessaires pour un vendeur sont remplis
            if (empty($data->nomEntreprise) || empty($data->adresseEntreprise)) {
                throw new \InvalidArgumentException('Les informations de l\'entreprise sont obligatoires pour un vendeur.');
            }

            $user = new Vendeur();
            $user->setNomEntreprise($data->nomEntreprise);
            $user->setAdresseEntreprise($data->adresseEntreprise);
            $user->setRoles(array_merge(['ROLE_USER'], ['ROLE_VENDEUR']));  // Fusionner les rôles
        } else {
            $user = new User();
            $user->setRoles(['ROLE_USER']);
        }

        // On applique les valeurs communes
        $user->setEmail($data->email);
        $user->setNom($data->nom);
        $user->setPrenom($data->prenom);

        // Hash du mot de passe
        $hashedPassword = $this->passwordHasher->hashPassword($user, $data->password);
        $user->setPassword($hashedPassword);

        // Persistance en base
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }
}
