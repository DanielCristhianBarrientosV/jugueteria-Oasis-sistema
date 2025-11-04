BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [users_role_df] DEFAULT 'CUSTOMER',
    [active] BIT NOT NULL CONSTRAINT [users_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[products] (
    [id] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] TEXT,
    [category] NVARCHAR(1000) NOT NULL,
    [supplier] NVARCHAR(1000) NOT NULL,
    [currentStock] INT NOT NULL,
    [minStock] INT NOT NULL,
    [majorPrice] FLOAT(53) NOT NULL,
    [minorPrice] FLOAT(53) NOT NULL,
    [imageUrl] NVARCHAR(1000),
    [active] BIT NOT NULL CONSTRAINT [products_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [products_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [products_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [products_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[sales] (
    [id] NVARCHAR(1000) NOT NULL,
    [saleNumber] NVARCHAR(1000) NOT NULL,
    [subtotal] FLOAT(53) NOT NULL,
    [discount] FLOAT(53) NOT NULL CONSTRAINT [sales_discount_df] DEFAULT 0,
    [total] FLOAT(53) NOT NULL,
    [saleType] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [sales_status_df] DEFAULT 'PENDING',
    [customerName] NVARCHAR(1000),
    [customerEmail] NVARCHAR(1000),
    [customerPhone] NVARCHAR(1000),
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [sales_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [sales_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [sales_saleNumber_key] UNIQUE NONCLUSTERED ([saleNumber])
);

-- CreateTable
CREATE TABLE [dbo].[sale_items] (
    [id] NVARCHAR(1000) NOT NULL,
    [saleId] NVARCHAR(1000) NOT NULL,
    [productId] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [unitPrice] FLOAT(53) NOT NULL,
    [subtotal] FLOAT(53) NOT NULL,
    CONSTRAINT [sale_items_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[suppliers] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [phone] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000),
    [active] BIT NOT NULL CONSTRAINT [suppliers_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [suppliers_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [suppliers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[customers] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [nit] NVARCHAR(1000),
    [active] BIT NOT NULL CONSTRAINT [customers_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [customers_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [customers_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [customers_email_key] UNIQUE NONCLUSTERED ([email])
);

-- AddForeignKey
ALTER TABLE [dbo].[sales] ADD CONSTRAINT [sales_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[sale_items] ADD CONSTRAINT [sale_items_saleId_fkey] FOREIGN KEY ([saleId]) REFERENCES [dbo].[sales]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[sale_items] ADD CONSTRAINT [sale_items_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[products]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
