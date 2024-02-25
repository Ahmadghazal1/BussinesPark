using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Globitle.API.Migrations
{
    /// <inheritdoc />
    public partial class Editcompany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CreatedAccount",
                table: "Companies",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAccount",
                table: "Companies");
        }
    }
}
