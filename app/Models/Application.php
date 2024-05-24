<?php

namespace App\Models;

use App\HasHumanDates;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    use HasFactory, HasHumanDates;

    protected $fillable = [
        'offer_id',
        'user_id',
        'status',
    ];

    protected $appends = [
        'created_at_human',
        'created_long_ago',
        'updated_at_human',
        'updated_long_ago',
    ];

    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class)->with('recruiter');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
