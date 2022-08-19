<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'priority', 'status', 'isArchived', 'tags']; // = CreateDTO

    // ! Eloquent coupled
    protected $casts = [
        "status" => TaskStatus::class,
        "tags" => "array",
    ];
}

// * Enum type is validated by declaring $casts property in the Model
enum TaskStatus: string
{
    case NotStarted = "Not started";
    case InProgress = "In progress";
    case Completed = "Completed";
}
