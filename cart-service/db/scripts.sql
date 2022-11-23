CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE carts (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
)

-- DROP TABLE carts;

 
CREATE TABLE cart_items (
	cart_id uuid NOT NULL, 
 	product_id uuid NOT NULL, 
 	count int4 NOT NULL DEFAULT 0,
 	FOREIGN KEY ("cart_id") REFERENCES "carts" ("id")
)

-- DROP TABLE cart_items;

INSERT INTO carts (id) VALUES
('34371e30-76e0-46f5-9f4c-cbdf08e85552');

INSERT INTO cart_items (cart_id, product_id, count) VALUES 
('34371e30-76e0-46f5-9f4c-cbdf08e85552', '7d533f3d-03c9-4a1f-85c7-e7c38a29613d', 7), 
('34371e30-76e0-46f5-9f4c-cbdf08e85552', '7cffde39-b7c4-4050-bb7c-57b639477ad7', 9); 