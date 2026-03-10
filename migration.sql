-- SQL Migration for Meal Delivery App (Supabase)

-- 1. Create Tables
CREATE TABLE customers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE meal_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    meals INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE delivery_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    delivery_date DATE NOT NULL,
    meal_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    delivery_boy_id UUID REFERENCES delivery_staff(id)
);

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'unpaid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- 3. Define Policies

-- Customers Table: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON customers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON customers FOR UPDATE USING (auth.uid() = id);

-- Meal Plans: Everyone can view active plans
CREATE POLICY "Anyone can view meal plans" ON meal_plans FOR SELECT TO authenticated USING (true);

-- Subscriptions: Users can see their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = customer_id);

-- Deliveries: Users see their own deliveries; Delivery staff see assigned ones
CREATE POLICY "Users can view own deliveries" ON deliveries FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Staff can view assigned deliveries" ON deliveries FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM delivery_staff WHERE phone = (auth.jwt() ->> 'phone_number') AND id = delivery_boy_id
  )
);

-- Invoices: Users see their own invoices
CREATE POLICY "Users can view own invoices" ON invoices FOR SELECT USING (auth.uid() = customer_id);

-- Admin Policies (Simplified: Admins usually have a special role or email domain)
CREATE POLICY "Admins have full access" ON customers TO authenticated USING (auth.jwt() ->> 'email' LIKE '%@mealmate.com');
CREATE POLICY "Admins manage everything" ON meal_plans TO authenticated USING (auth.jwt() ->> 'email' LIKE '%@mealmate.com');
CREATE POLICY "Admins view all subs" ON subscriptions TO authenticated USING (auth.jwt() ->> 'email' LIKE '%@mealmate.com');
CREATE POLICY "Admins manage deliveries" ON deliveries TO authenticated USING (auth.jwt() ->> 'email' LIKE '%@mealmate.com');
CREATE POLICY "Admins manage invoices" ON invoices TO authenticated USING (auth.jwt() ->> 'email' LIKE '%@mealmate.com');
