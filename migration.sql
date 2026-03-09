-- SQL Migration for Meal Delivery App Database Schema

-- 1. Create Users Table
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'delivery');
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    address TEXT,
    preferred_meal VARCHAR(50) DEFAULT 'veg',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Meal Plans Table
CREATE TABLE meal_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    meals_count INTEGER NOT NULL,
    meal_type VARCHAR(50) DEFAULT 'veg',
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Subscriptions Table
CREATE TYPE subscription_status AS ENUM ('active', 'paused', 'expired', 'cancelled');
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES meal_plans(id),
    status subscription_status NOT NULL DEFAULT 'active',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    remaining_meals INTEGER NOT NULL,
    pause_start_date DATE,
    pause_resume_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Deliveries Table
CREATE TYPE delivery_status AS ENUM ('pending', 'out_for_delivery', 'delivered', 'failed');
CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    delivery_boy_id UUID REFERENCES users(id),
    delivery_date DATE NOT NULL,
    meal_type VARCHAR(50) NOT NULL,
    status delivery_status NOT NULL DEFAULT 'pending',
    failed_reason TEXT,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Invoices Table
CREATE TYPE invoice_status AS ENUM ('unpaid', 'paid');
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id),
    amount DECIMAL(10, 2) NOT NULL,
    status invoice_status NOT NULL DEFAULT 'unpaid',
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
