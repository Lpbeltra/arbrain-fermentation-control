using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArBrain.FermentationControl.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Beers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Style = table.Column<string>(type: "text", nullable: false),
                    MinTemperature = table.Column<decimal>(type: "numeric", nullable: false),
                    MaxTemperature = table.Column<decimal>(type: "numeric", nullable: false),
                    MinPh = table.Column<decimal>(type: "numeric", nullable: false),
                    MaxPh = table.Column<decimal>(type: "numeric", nullable: false),
                    MinExtract = table.Column<decimal>(type: "numeric", nullable: false),
                    MaxExtract = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FermentationRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BeerId = table.Column<Guid>(type: "uuid", nullable: false),
                    TankId = table.Column<Guid>(type: "uuid", nullable: false),
                    BatchNumber = table.Column<string>(type: "text", nullable: false),
                    Temperature = table.Column<decimal>(type: "numeric", nullable: false),
                    Ph = table.Column<decimal>(type: "numeric", nullable: false),
                    Extract = table.Column<decimal>(type: "numeric", nullable: false),
                    RegisteredAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Observations = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FermentationRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tanks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CapacityLiters = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tanks", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Beers");

            migrationBuilder.DropTable(
                name: "FermentationRecords");

            migrationBuilder.DropTable(
                name: "Tanks");
        }
    }
}
