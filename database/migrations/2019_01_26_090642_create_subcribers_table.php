<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubcribersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subcribers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('sub_code');
            $table->string('first_name');
            $table->string('middle_name')->nullable(true);
            $table->string('last_name');
            $table->text('photo');
            $table->string('date_of_birth');
            $table->string('email')->nullable(true);
            $table->string('phone');
            $table->string('gender');
            $table->string('marital_status');
            $table->string('disabled'); // true | false
            $table->text('disability'); // if true -> state disability
            $table->text('address');
            $table->string('hometown');
            $table->string('region'); 
            $table->string('nationality'); // Ghana, London
            $table->string('continent'); // Africa, Europe
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subcribers');
    }
}
