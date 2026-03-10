-- SQL Migration for Meal Delivery App (Supabase)

-- 1. Create Customers Table
CREATE TABLE customers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Meal Plans Table
CREATE TABLE meal_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    meals INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Subscriptions Table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES meal_plans(id),
    start_date DATE NOT NULL,
    remaining_days INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    pause_start DATE,
    pause_end DATE
);

-- 4. Create Delivery Staff Table
CREATE TABLE delivery_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active'
);

-- 5. Create Deliveries Table
CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    delivery_date DATE NOT NULL,
    meal_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    delivery_boy_id UUID REFERENCES delivery_staff(id)
);

-- 6. Create Invoices Table
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'unpaid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
