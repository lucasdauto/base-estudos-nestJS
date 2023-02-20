FROM mysql:8.0.32

ENV MYSQL_ROOT_PASSWORD=docker
ENV MYSQL_DATABASE=db_courses_nest

COPY custom.cnf /etc/mysql/conf.d/custom.cnf

EXPOSE 3308

CMD ["mysqld"]