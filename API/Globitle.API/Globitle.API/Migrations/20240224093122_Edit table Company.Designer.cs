﻿// <auto-generated />
using System;
using Globitle.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Globitle.API.Migrations
{
    [DbContext(typeof(GlobitleDbContext))]
    [Migration("20240224093122_Edit table Company")]
    partial class EdittableCompany
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Globitle.API.Models.Domain.Company", b =>
                {
                    b.Property<Guid>("CompanyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MobileNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("SectorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Size")
                        .HasColumnType("int");

                    b.HasKey("CompanyId");

                    b.HasIndex("SectorId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("Globitle.API.Models.Domain.CompanyComplaint", b =>
                {
                    b.Property<Guid>("CompanyComplaintId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CompanyComplaintId");

                    b.HasIndex("CompanyId");

                    b.ToTable("CompanyComplaints");
                });

            modelBuilder.Entity("Globitle.API.Models.Domain.ComplaintSuggestion", b =>
                {
                    b.Property<Guid>("ComplaintSuggestionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ComplaintSuggestionId");

                    b.HasIndex("CompanyId");

                    b.ToTable("ComplaintSuggestions");
                });

            modelBuilder.Entity("Globitle.API.Models.Domain.Sector", b =>
                {
                    b.Property<Guid>("SectorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SectorId");

                    b.ToTable("Sectors");
                });

            modelBuilder.Entity("Globitle.API.Models.Domain.Company", b =>
                {
                    b.HasOne("Globitle.API.Models.Domain.Sector", "Sector")
                        .WithMany("Companies")
                        .HasForeignKey("SectorId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Sector");
                });

            modelBuilder.Entity("Globitle.API.Models.Domain.CompanyComplaint", b =>
                {
                    b.HasOne("Globitle.API.Models.Domain.Company", "Company")
                        .WithMany("CompanyComplaints")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("Globitle.API.Models.Domain.ComplaintSuggestion", b =>
                {
                    b.HasOne("Globitle.API.Models.Domain.Company", "Company")
                        .WithMany("ComplaintSuggestions")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("Globitle.API.Models.Domain.Company", b =>
                {
                    b.Navigation("CompanyComplaints");

                    b.Navigation("ComplaintSuggestions");
                });

            modelBuilder.Entity("Globitle.API.Models.Domain.Sector", b =>
                {
                    b.Navigation("Companies");
                });
#pragma warning restore 612, 618
        }
    }
}
