using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiTestv2.Migrations
{
    /// <inheritdoc />
    public partial class updateProductocreateTipoProducto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productos_Usuarios_Usuarioid",
                table: "Productos");

            migrationBuilder.RenameColumn(
                name: "nombre",
                table: "Usuarios",
                newName: "Nombre");

            migrationBuilder.RenameColumn(
                name: "correo",
                table: "Usuarios",
                newName: "Correo");

            migrationBuilder.RenameColumn(
                name: "contrasenia",
                table: "Usuarios",
                newName: "Contrasenia");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Usuarios",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "nombre",
                table: "Productos",
                newName: "Nombre");

            migrationBuilder.RenameColumn(
                name: "codigo",
                table: "Productos",
                newName: "Codigo");

            migrationBuilder.RenameColumn(
                name: "Usuarioid",
                table: "Productos",
                newName: "UsuarioId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Productos",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Productos_Usuarioid",
                table: "Productos",
                newName: "IX_Productos_UsuarioId");

            migrationBuilder.AddColumn<string>(
                name: "Descripcion",
                table: "Productos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ImgProduct",
                table: "Productos",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Precio",
                table: "Productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TipoProductoId",
                table: "Productos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TiposProductos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposProductos", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Productos_TipoProductoId",
                table: "Productos",
                column: "TipoProductoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Productos_TiposProductos_TipoProductoId",
                table: "Productos",
                column: "TipoProductoId",
                principalTable: "TiposProductos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Productos_Usuarios_UsuarioId",
                table: "Productos",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productos_TiposProductos_TipoProductoId",
                table: "Productos");

            migrationBuilder.DropForeignKey(
                name: "FK_Productos_Usuarios_UsuarioId",
                table: "Productos");

            migrationBuilder.DropTable(
                name: "TiposProductos");

            migrationBuilder.DropIndex(
                name: "IX_Productos_TipoProductoId",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "Descripcion",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "ImgProduct",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "Precio",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "TipoProductoId",
                table: "Productos");

            migrationBuilder.RenameColumn(
                name: "Nombre",
                table: "Usuarios",
                newName: "nombre");

            migrationBuilder.RenameColumn(
                name: "Correo",
                table: "Usuarios",
                newName: "correo");

            migrationBuilder.RenameColumn(
                name: "Contrasenia",
                table: "Usuarios",
                newName: "contrasenia");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Usuarios",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Productos",
                newName: "Usuarioid");

            migrationBuilder.RenameColumn(
                name: "Nombre",
                table: "Productos",
                newName: "nombre");

            migrationBuilder.RenameColumn(
                name: "Codigo",
                table: "Productos",
                newName: "codigo");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Productos",
                newName: "id");

            migrationBuilder.RenameIndex(
                name: "IX_Productos_UsuarioId",
                table: "Productos",
                newName: "IX_Productos_Usuarioid");

            migrationBuilder.AddForeignKey(
                name: "FK_Productos_Usuarios_Usuarioid",
                table: "Productos",
                column: "Usuarioid",
                principalTable: "Usuarios",
                principalColumn: "id");
        }
    }
}
