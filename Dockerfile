FROM node:22
ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:8-jre $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"
CMD [ "npm", "run", "generate" ]
WORKDIR /workspace