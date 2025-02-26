<?php

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Post;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Book;
use App\Repository\AuteurRepository;
use App\Repository\EtatRepository;
use App\Repository\GenreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

class BookDataPersister implements ProcessorInterface
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly Security $security,
        private GenreRepository $genreRepository,
        private AuteurRepository $auteurRepository,
        private EtatRepository $etatRepository
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Book
    {
        if ($this->security->getUser() === null) {
            throw new \Exception('User must be authenticated to create a book');
        }
        $data->setUser($this->security->getUser());
        
        if ($data instanceof Book && $operation instanceof Post) {
            $data->setUser($this->security->getUser());
            
        }

        $this->entityManager->persist($data);
        $this->entityManager->flush();

        return $data;
    }
}