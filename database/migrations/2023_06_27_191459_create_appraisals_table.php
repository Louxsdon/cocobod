<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appraisals', function (Blueprint $table) {
            $table->id();
            $table->string("question1")->nullable();
            $table->string("question1_answer")->nullable();
            $table->string("question2")->nullable();
            $table->string("question2_answer")->nullable();
            $table->string("question3")->nullable();
            $table->string("question3_answer")->nullable();
            $table->string("question4")->nullable();
            $table->string("question4_answer")->nullable();
            $table->string("question5")->nullable();
            $table->string("question5_answer")->nullable();
            $table->string("question6")->nullable();
            $table->string("question6_answer")->nullable();
            $table->string("question7")->nullable();
            $table->string("question7_answer")->nullable();
            $table->string("question8")->nullable();
            $table->string("question8_answer")->nullable();
            $table->string("question9")->nullable();
            $table->string("question9_answer")->nullable();
            $table->string("question10")->nullable();
            $table->string("question10_answer")->nullable();
            $table->foreignId("user_id")->constrained()->cascadeOnDelete();
            $table->foreignId("department_id")->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId("reviewer_id")->nullable()->constrained("users")->cascadeOnDelete();
            $table->enum("status", ["pending", "submitted", "reviewed", "rejected", "approved"]);
            $table->string("rejected_reason")->nullable();
            $table->boolean("visible")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appraisals');
    }
};
