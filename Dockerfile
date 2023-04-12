FROM postgres:latest
COPY db-dump/realty-zone-db.sql /docker-entrypoint-initdb.d/
