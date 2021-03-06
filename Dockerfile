FROM nginx:1.14
MAINTAINER "jit-ggzw"
COPY ./dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
# CentOS use -> RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# Ubuntu use -> RUN echo 'Asia/Shanghai' >/etc/timezone
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
