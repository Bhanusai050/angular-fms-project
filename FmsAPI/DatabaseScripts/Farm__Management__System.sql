Create database FarmManagementSystem;
use FarmManagementSystem;

-- Lookup Tables
CREATE TABLE IdLookup (
    IdLookupID INT IDENTITY(1,1) PRIMARY KEY,
    LookupName VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IdLookupValues (
    IdValueID INT IDENTITY(1,1) PRIMARY KEY,
    IdLookupID INT FOREIGN KEY REFERENCES IdLookup(IdLookupID),
    ValueName VARCHAR(50) NOT NULL,
    CONSTRAINT UQ_LookupCombo UNIQUE (IdLookupID, ValueName)
);

-- Users & Authentication
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE PasswordResetTokens (
    TokenID INT IDENTITY(1,1) PRIMARY KEY,
    Email VARCHAR(100) NOT NULL,
    OTP VARCHAR(10) NOT NULL,
    ExpiryTime DATETIME NOT NULL,
    IsUsed BIT DEFAULT 0
);

-- RBAC
CREATE TABLE Roles (
    RoleID INT IDENTITY(1,1) PRIMARY KEY,
    RoleName VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Permissions (
    PermissionID INT IDENTITY(1,1) PRIMARY KEY,
    PermissionName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE UserRoles (
    UserRoleID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    RoleID INT FOREIGN KEY REFERENCES Roles(RoleID),
    CONSTRAINT UQ_UserRole UNIQUE(UserID, RoleID)
);

CREATE TABLE RolePermissions (
    RolePermissionID INT IDENTITY(1,1) PRIMARY KEY,
    RoleID INT FOREIGN KEY REFERENCES Roles(RoleID),
    PermissionID INT FOREIGN KEY REFERENCES Permissions(PermissionID),
    CONSTRAINT UQ_RolePermission UNIQUE(RoleID, PermissionID)
);


-- Public or Website Interaction
CREATE TABLE ContactMessages (
    MessageID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15),
    Message TEXT NOT NULL,
    SubmittedAt DATETIME DEFAULT GETDATE()
);



-- Company Info
CREATE TABLE Company (
    CompanyID INT IDENTITY(1,1) PRIMARY KEY,
    CompanyName VARCHAR(100) NOT NULL,
    OwnerName VARCHAR(100),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100),
    Location VARCHAR(100),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Investments & Land
CREATE TABLE Investments (
    InvestmentID INT IDENTITY(1,1) PRIMARY KEY,
    Date DATE NOT NULL,
    CapitalAmount DECIMAL(12,2) NOT NULL,
    Description TEXT
);

CREATE TABLE LandPurchases (
    LandID INT IDENTITY(1,1) PRIMARY KEY,
    PurchaseDate DATE NOT NULL,
    Location VARCHAR(100),
    Size DECIMAL(10,2),
    Cost DECIMAL(12,2),
    Purpose VARCHAR(100)
);

-- Vendors
CREATE TABLE Vendors (
    VendorID INT IDENTITY(1,1) PRIMARY KEY,
    VendorName VARCHAR(100),
    Category VARCHAR(50),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100),
    Location VARCHAR(100)
);

-- Assets & Animals
CREATE TABLE Assets (
    AssetID INT IDENTITY(1,1) PRIMARY KEY,
    AssetName VARCHAR(100),
    Category VARCHAR(50),
    PurchaseDate DATE,
    Cost DECIMAL(12,2),
    VendorID INT FOREIGN KEY REFERENCES Vendors(VendorID),
    Notes TEXT
);




CREATE TABLE Animals (
    AnimalID INT IDENTITY(1,1) PRIMARY KEY,
    AnimalTypeID INT FOREIGN KEY REFERENCES IdLookupValues(IdValueID),
    AnimalName VARCHAR(50),
    BirthDate DATE,
    GenderID INT FOREIGN KEY REFERENCES IdLookupValues(IdValueID),
    HealthStatusID INT FOREIGN KEY REFERENCES IdLookupValues(IdValueID),
    AnimalCost DECIMAL(12,2),
    VendorID INT FOREIGN KEY REFERENCES Vendors(VendorID),
    AnimalStatusID INT FOREIGN KEY REFERENCES IdLookupValues(IdValueID),
    AnimalPurchasedDate DATE
);

select * from animals;

--AnimalBatches

CREATE TABLE AnimalBatches (
    BatchID INT IDENTITY(1,1) PRIMARY KEY,
    BatchName VARCHAR(50) NOT NULL,
    PurchasedDate DATE NOT NULL,
    Purpose VARCHAR(50) NOT NULL
);

select * from AnimalBatches;

-- Feed Management
CREATE TABLE Feed_Inventory (
    FeedID INT IDENTITY(1,1) PRIMARY KEY,
    FeedTypeID INT FOREIGN KEY REFERENCES IdLookupValues(IdValueID),
    StockQuantity DECIMAL(10,2),
    Unit VARCHAR(20),
    ExpiryDate DATE
);

CREATE TABLE FeedPurchases (
    PurchaseID INT IDENTITY(1,1) PRIMARY KEY,
    VendorID INT FOREIGN KEY REFERENCES Vendors(VendorID),
    FeedTypeID INT FOREIGN KEY REFERENCES IdLookupValues(IdValueID),
    Quantity DECIMAL(10,2),
    Cost DECIMAL(12,2),
    PurchaseDate DATE
);

CREATE TABLE Feed_Consumption (
    ConsumptionID INT IDENTITY(1,1) PRIMARY KEY,
    AnimalID INT FOREIGN KEY REFERENCES Animals(AnimalID),
    FeedID INT FOREIGN KEY REFERENCES Feed_Inventory(FeedID),
    Quantity DECIMAL(10,2),
    Date DATE
);

-- Production & Expenses
CREATE TABLE Production (
    ProductionID INT IDENTITY(1,1) PRIMARY KEY,
    Date DATE NOT NULL,
    Type VARCHAR(50),
    Quantity DECIMAL(10,2),
    AnimalID INT FOREIGN KEY REFERENCES Animals(AnimalID)
);

CREATE TABLE Expenses (
    ExpenseID INT IDENTITY(1,1) PRIMARY KEY,
    Date DATE,
    Type VARCHAR(50),
    Amount DECIMAL(12,2),
    LinkedFeedID INT NULL FOREIGN KEY REFERENCES Feed_Inventory(FeedID),
    LinkedAnimalID INT NULL FOREIGN KEY REFERENCES Animals(AnimalID)
);

-- Customers & Orders
CREATE TABLE Customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    FullName VARCHAR(100),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100),
    Location VARCHAR(100),
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    OrderDate DATE,
    PaymentStatus VARCHAR(50),
    OrderStatus VARCHAR(50),
    ProductionID INT FOREIGN KEY REFERENCES Production(ProductionID),
    Quantity DECIMAL(10,2),
    UnitPrice DECIMAL(10,2),
    TotalAmount AS (Quantity * UnitPrice) PERSISTED
);

-- Workers & Salaries
CREATE TABLE Workers (
    WorkerID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100),
    Role VARCHAR(50),
    HireDate DATE,
    ContactInfo VARCHAR(255)
);

CREATE TABLE Salaries (
    SalaryID INT IDENTITY(1,1) PRIMARY KEY,
    WorkerID INT FOREIGN KEY REFERENCES Workers(WorkerID),
    PaymentDate DATE,
    Amount DECIMAL(12,2),
    Notes TEXT
);


select * from users;

select * from animals;

select * from customers;
---Stored Procedures---

--ANIMAL MANAGEMENT--

--1. Add a New Animal to a Batch

CREATE PROCEDURE AddAnimalToBatch
    @BatchID INT,
    @AnimalName VARCHAR(50),
    @BirthDate DATE,
    @AnimalTypeID INT,
    @GenderID INT,
    @HealthStatusID INT,
    @AnimalCost DECIMAL(12,2),
    @VendorID INT,
    @AnimalStatusID INT,
    @AnimalPurchasedDate DATE
AS
BEGIN
    INSERT INTO Animals (
        BatchID, AnimalName, BirthDate, AnimalTypeID, GenderID,
        HealthStatusID, AnimalCost, VendorID, AnimalStatusID, AnimalPurchasedDate
    )
    VALUES (
        @BatchID, @AnimalName, @BirthDate, @AnimalTypeID, @GenderID,
        @HealthStatusID, @AnimalCost, @VendorID, @AnimalStatusID, @AnimalPurchasedDate
    );
END;


--2. Get All Animals by Batch


CREATE PROCEDURE GetAnimalsByBatch
    @BatchID INT
AS
BEGIN
    SELECT * FROM Animals
    WHERE BatchID = @BatchID;
END;




--- Feed Management---

--1.Add Feed Purchase

CREATE PROCEDURE AddFeedPurchase
    @VendorID INT,
    @FeedTypeID INT,
    @Quantity DECIMAL(10,2),
    @Cost DECIMAL(12,2),
    @PurchaseDate DATE
AS
BEGIN
    INSERT INTO FeedPurchases (VendorID, FeedTypeID, Quantity, Cost, PurchaseDate)
    VALUES (@VendorID, @FeedTypeID, @Quantity, @Cost, @PurchaseDate);
END;


--2.Record Feed Consumption

CREATE PROCEDURE AddFeedConsumption
    @AnimalID INT,
    @FeedID INT,
    @Quantity DECIMAL(10,2),
    @Date DATE
AS
BEGIN
    INSERT INTO Feed_Consumption (AnimalID, FeedID, Quantity, Date)
    VALUES (@AnimalID, @FeedID, @Quantity, @Date);
END;





---Production & Expenses---

--1. Add Production Entry

CREATE PROCEDURE AddProduction
    @Date DATE,
    @Type VARCHAR(50),
    @Quantity DECIMAL(10,2),
    @AnimalID INT
AS
BEGIN
    INSERT INTO Production (Date, Type, Quantity, AnimalID)
    VALUES (@Date, @Type, @Quantity, @AnimalID);
END;


--2. Add Expense Entry

CREATE PROCEDURE AddExpense
    @Date DATE,
    @Type VARCHAR(50),
    @Amount DECIMAL(12,2),
    @LinkedFeedID INT = NULL,
    @LinkedAnimalID INT = NULL
AS
BEGIN
    INSERT INTO Expenses (Date, Type, Amount, LinkedFeedID, LinkedAnimalID)
    VALUES (@Date, @Type, @Amount, @LinkedFeedID, @LinkedAnimalID);
END;




---Worker & Salary Management---

--1. Add Salary Payment

CREATE PROCEDURE AddSalary
    @WorkerID INT,
    @PaymentDate DATE,
    @Amount DECIMAL(12,2),
    @Notes TEXT
AS
BEGIN
    INSERT INTO Salaries (WorkerID, PaymentDate, Amount, Notes)
    VALUES (@WorkerID, @PaymentDate, @Amount, @Notes);
END;


---Customer Orders---

--1.Add Customer Order

CREATE PROCEDURE AddCustomerOrder
    @CustomerID INT,
    @OrderDate DATE,
    @PaymentStatus VARCHAR(50),
    @OrderStatus VARCHAR(50),
    @ProductionID INT,
    @Quantity DECIMAL(10,2),
    @UnitPrice DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Orders (
        CustomerID, OrderDate, PaymentStatus, OrderStatus,
        ProductionID, Quantity, UnitPrice
    )
    VALUES (
        @CustomerID, @OrderDate, @PaymentStatus, @OrderStatus,
        @ProductionID, @Quantity, @UnitPrice
    );
END;


