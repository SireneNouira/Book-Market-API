<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\VendeurRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(    normalizationContext: ['groups' => ['user:read']],
denormalizationContext: ['groups' => ['user:write']],
)]
#[ORM\Entity]
class Vendeur extends User
{
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(groups: ['vendeur:write'])]
    #[Groups(['user:write', 'user:read'])]
    private ?string $nomEntreprise = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(groups: ['vendeur:write'])]
    #[Groups(['user:write', 'user:read'])]
    private ?string $adresseEntreprise = null;

    public function getNomEntreprise(): ?string
    {
        return $this->nomEntreprise;
    }

    public function setNomEntreprise(string $nomEntreprise): static
    {
        $this->nomEntreprise = $nomEntreprise;

        return $this;
    }

    public function getAdresseEntreprise(): ?string
    {
        return $this->adresseEntreprise;
    }

    public function setAdresseEntreprise(string $adresseEntreprise): static
    {
        $this->adresseEntreprise = $adresseEntreprise;

        return $this;
    }
}
