﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactWithASP.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePhoneNumberRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Employees",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Employees",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
