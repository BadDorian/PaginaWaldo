using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTestv2.Migrations
{
    /// <inheritdoc />
    public partial class subcategoriasupdateproductoupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productos_TiposProductos_TipoProductoId",
                table: "Productos");

            migrationBuilder.RenameColumn(
                name: "TipoProductoId",
                table: "Productos",
                newName: "SubCategoriaId");

            migrationBuilder.RenameIndex(
                name: "IX_Productos_TipoProductoId",
                table: "Productos",
                newName: "IX_Productos_SubCategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Productos_SubCategorias_SubCategoriaId",
                table: "Productos",
                column: "SubCategoriaId",
                principalTable: "SubCategorias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productos_SubCategorias_SubCategoriaId",
                table: "Productos");

            migrationBuilder.RenameColumn(
                name: "SubCategoriaId",
                table: "Productos",
                newName: "TipoProductoId");

            migrationBuilder.RenameIndex(
                name: "IX_Productos_SubCategoriaId",
                table: "Productos",
                newName: "IX_Productos_TipoProductoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Productos_TiposProductos_TipoProductoId",
                table: "Productos",
                column: "TipoProductoId",
                principalTable: "TiposProductos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
