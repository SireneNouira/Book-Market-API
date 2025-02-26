<?php
namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\DataPersister\UserDataPersister as DataPersisterUserDataPersister;
use App\Entity\User;
use App\Entity\Vendeur;
use App\Processor\UserDataPersister;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/register',
            denormalizationContext: ['groups' => ['user:write']],
            validationContext: ['groups' => ['Default']],
            security: "is_granted('PUBLIC_ACCESS')",
            processor: DataPersisterUserDataPersister::class
        )
    ]
)]
class UserResource
{
    // Vous pouvez ajouter des propriétés supplémentaires ici si nécessaire
}