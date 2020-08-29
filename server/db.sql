
CREATE TABLE currencyBase (
  id uuid PRIMARY KEY,
  base varchar,
);

CREATE TABLE rates (
  id uuid PRIMARY KEY,
  lastUpdated Date,
  countryCode varchar,
  rate numeric,
  base uuid
  FOREIGN KEY (base) REFERENCES currencyBase(id)
);
grant all privileges on database rates to currencyuser;
grant all privileges on usertable currencyBase currencyuser;