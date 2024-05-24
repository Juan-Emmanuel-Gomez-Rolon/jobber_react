<?php

namespace App;

trait HasHumanDates
{
    public function getCreatedAtHumanAttribute($value)
    {
        return $this->created_at->format('d/m/Y H:i:s');
    }

    public function getCreatedLongAgoAttribute($value)
    {
        return $this->created_at->diffForHumans();
    }

    public function getUpdatedAtHumanAttribute($value)
    {
        return $this->updated_at->format('d/m/Y H:i:s');
    }

    public function getUpdatedLongAgoAttribute($value)
    {
        return $this->updated_at->diffForHumans();
    }
}
