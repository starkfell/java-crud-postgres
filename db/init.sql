-- Create the table for user entries
CREATE TABLE user_entry (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255)
);

-- Optional: Add an index if you plan to search by location frequently
CREATE INDEX idx_user_location ON user_entry(location);