using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArBrain.FermentationControl.Infrastructure.Migrations
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

            migrationBuilder.CreateTable(
                name: "FermentationRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RecordedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    BatchNumber = table.Column<string>(type: "text", nullable: false),
                    Temperature = table.Column<decimal>(type: "numeric", nullable: false),
                    Ph = table.Column<decimal>(type: "numeric", nullable: false),
                    Extract = table.Column<decimal>(type: "numeric", nullable: false),
                    Observation = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    BeerId = table.Column<Guid>(type: "uuid", nullable: false),
                    TankId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FermentationRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FermentationRecords_Beers_BeerId",
                        column: x => x.BeerId,
                        principalTable: "Beers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FermentationRecords_Tanks_TankId",
                        column: x => x.TankId,
                        principalTable: "Tanks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FermentationRecords_BeerId",
                table: "FermentationRecords",
                column: "BeerId");

            migrationBuilder.CreateIndex(
                name: "IX_FermentationRecords_TankId",
                table: "FermentationRecords",
                column: "TankId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FermentationRecords");

            migrationBuilder.DropTable(
                name: "Beers");

            migrationBuilder.DropTable(
                name: "Tanks");
        }
    }
}
