using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTestv2.Migrations
{
    /// <inheritdoc />
    public partial class subcategoriasupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategoria_TiposProductos_TipoProductoId",
                table: "SubCategoria");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubCategoria",
                table: "SubCategoria");

            migrationBuilder.RenameTable(
                name: "SubCategoria",
                newName: "SubCategorias");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategoria_TipoProductoId",
                table: "SubCategorias",
                newName: "IX_SubCategorias_TipoProductoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubCategorias",
                table: "SubCategorias",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategorias_TiposProductos_TipoProductoId",
                table: "SubCategorias",
                column: "TipoProductoId",
                principalTable: "TiposProductos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategorias_TiposProductos_TipoProductoId",
                table: "SubCategorias");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubCategorias",
                table: "SubCategorias");

            migrationBuilder.RenameTable(
                name: "SubCategorias",
                newName: "SubCategoria");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategorias_TipoProductoId",
                table: "SubCategoria",
                newName: "IX_SubCategoria_TipoProductoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubCategoria",
                table: "SubCategoria",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategoria_TiposProductos_TipoProductoId",
                table: "SubCategoria",
                column: "TipoProductoId",
                principalTable: "TiposProductos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
