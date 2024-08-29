using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTestv2.Migrations
{
    /// <inheritdoc />
    public partial class fixedProducto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productos_Usuarios_UsuarioId",
                table: "Productos");

            migrationBuilder.DropIndex(
                name: "IX_Productos_UsuarioId",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Productos");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Productos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Productos_UsuarioId",
                table: "Productos",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Productos_Usuarios_UsuarioId",
                table: "Productos",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }
    }
}
