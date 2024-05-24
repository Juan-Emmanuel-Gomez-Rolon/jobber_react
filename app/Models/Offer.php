<?php

namespace App\Models;

use App\HasHumanDates;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offer extends Model
{
    use HasFactory;
    use HasHumanDates;

    protected $fillable = [
        'title',
        'description',
        'category',
        'user_id',
    ];

    protected $appends = [
        'applications_count',
        'created_at_human',
        'created_long_ago',
        'updated_at_human',
        'updated_long_ago',
    ];

    // relationships
    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    // scopes
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // appends
    public function getApplicationsCountAttribute(): int
    {
        return $this->applications()->count();
    }
}
