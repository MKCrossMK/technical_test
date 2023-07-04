<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    public const PAYMENT_STATUS_COMPLETED = 'Completed';
    public const PAYMENT_STATUS_PENDING = 'Pending';
    public const PAYMENT_STATUS_FAILED = 'Failed';

    
    protected $fillable = [
        'user_id',
        'total_amount',
        'payment_id',
        'payment_status',
    ];


    public function items() {
        return $this->hasMany(InvoiceDetail::class, 'id', 'invoice_id');
    }
}
