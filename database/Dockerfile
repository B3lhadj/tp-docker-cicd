
FROM mysql:8.0


RUN mkdir -p /data/db


WORKDIR /data


#COPY my.cnf /etc/mysql/my.cnf


EXPOSE 3306


ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=mydatabase


CMD ["mysqld"]

