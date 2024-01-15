using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarShop.Migrations
{
    /// <inheritdoc />
    public partial class renteddatauser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "RentedDatas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_RentedDatas_UserId",
                table: "RentedDatas",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RentedDatas_AspNetUsers_UserId",
                table: "RentedDatas",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentedDatas_AspNetUsers_UserId",
                table: "RentedDatas");

            migrationBuilder.DropIndex(
                name: "IX_RentedDatas_UserId",
                table: "RentedDatas");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "RentedDatas");
        }
    }
}
