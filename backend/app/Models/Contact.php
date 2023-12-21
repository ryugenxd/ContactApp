<?php

namespace App\Models;
;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Contact extends Model
{
  protected $primaryKey = "id";
  protected $keyType = "int";
  protected $table = "contacts";
  public $incrementing = true;
  public $timestamps = true;

  protected $fillable = [
    'first_name',
    'last_name',
    'email',
    'phone'
  ];

  /**
   * Get the user that owns the Contact
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function user(): BelongsTo
  {
      return $this->belongsTo(Contact::class, 'user_id', 'id');
  }

  /**
   * Get all of the addresses for the Contact
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function addresses(): HasMany
  {
      return $this -> hasMany(Address::class, 'contact_id', 'id');
  }
}
