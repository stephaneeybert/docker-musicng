FROM stephaneeybert/httpd:2.4.25

RUN apt-get update \
  && apt-get install -y bash \
  && apt-get install -y unzip \
  && apt-get install -y curl \
  && apt-get install -y wget \
  && apt-get install -y --no-install-recommends apt-utils \
  && apt-get install -y locales \
  && locale-gen en_GB \
  && locale-gen fr_FR \
  && locale-gen sv_SE \
  && locale-gen nn_NO \
  && localedef -i en_GB -f UTF-8 en_GB.UTF-8 \
  && localedef -i fr_FR -f UTF-8 fr_FR.UTF-8 \
  && localedef -i sv_SE -f UTF-8 sv_SE.UTF-8 \
  && localedef -i nn_NO -f UTF-8 nn_NO.UTF-8

WORKDIR /usr/local/musicng

RUN groupadd -f apache && useradd -d /usr/local/musicng/ -g apache apache
RUN chown -R apache:apache /usr/local/musicng/ \
  && chmod -R 755 /usr/local/musicng/

COPY expand-secrets.sh /usr/local/musicng/
COPY start.sh /usr/local/musicng/

COPY httpd.conf /usr/local/apache/conf
COPY httpd-ssl.conf /usr/local/apache/conf/extra

#ENTRYPOINT ["/usr/bin/tail", "-f", "/dev/null"]
ENTRYPOINT ["/bin/bash", "/usr/local/musicng/start.sh"]

