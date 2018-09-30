project_name = luna_gateway

time = $(shell date +%Y-%m-%d_%H%M)

prod-pull:
	docker-compose -f docker-compose.prod.yml pull

prod-up:
	docker-compose -f docker-compose.prod.yml up

prod-up-bg:
	docker-compose -f docker-compose.prod.yml up -d

prod-stop:
	docker-compose -f docker-compose.prod.yml stop

prod-rm:
	docker-compose -f docker-compose.prod.yml rm -f

prod-ps:
	docker-compose -f docker-compose.prod.yml ps

# Re Run script
prod-rerun:
	make prod-pull
	make prod-stop
	make prod-rm
	make prod-up-bg

backup-database:
	docker exec -it $(project_name)_postgres bash -c 'pg_dump --user postgres -F c $(project_name)_postgres > /$(project_name)-postgres-backup/$(project_name)_$(time)'
	docker exec -it $(project_name)_postgres bash -c 'pg_dump --user postgres -F c $(project_name)_postgres > /$(project_name)-postgres-backup/$(project_name)_latest'

restore-database:
	docker exec -it $(project_name)_postgres bash -c 'pg_restore --user postgres --dbname=$(project_name)_postgres --clean /$(project_name)-postgres-backup/$(project_name)_latest'
