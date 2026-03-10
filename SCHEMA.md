# Meal Delivery App Database Schema (Supabase)

## Tables

### 1. `customers`
- `id`: UUID (Primary Key, matches Auth)
- `name`: TEXT
- `phone`: TEXT (Unique)
- `address`: TEXT
- `created_at`: TIMESTAMP

### 2. `meal_plans`
- `id`: UUID (Primary Key)
- `plan_name`: TEXT
- `price`: NUMERIC
- `meals`: INTEGER
- `created_at`: TIMESTAMP

### 3. `subscriptions`
- `id`: UUID (Primary Key)
- `customer_id`: UUID (FK -> customers.id)
- `plan_id`: UUID (FK -> meal_plans.id)
- `start_date`: DATE
- `remaining_days`: INTEGER
- `status`: TEXT ('active', 'paused', 'expired')
- `pause_start`: DATE
- `pause_end`: DATE

### 4. `deliveries`
- `id`: UUID (Primary Key)
- `customer_id`: UUID (FK -> customers.id)
- `delivery_date`: DATE
- `meal_type`: TEXT ('veg', 'non-veg')
- `status`: TEXT ('pending', 'delivered', 'failed')
- `delivery_boy_id`: UUID (FK -> delivery_staff.id)

### 5. `delivery_staff`
- `id`: UUID (Primary Key)
- `name`: TEXT
- `phone`: TEXT
- `status`: TEXT ('active', 'inactive')

### 6. `invoices`
- `id`: UUID (Primary Key)
- `customer_id`: UUID (FK -> customers.id)
- `amount`: NUMERIC
- `status`: TEXT ('unpaid', 'paid')
- `created_at`: TIMESTAMP
