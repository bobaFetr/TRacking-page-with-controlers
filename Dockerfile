# STAGE 1: Build React Frontend
FROM node:20 AS frontend-build
WORKDIR /src
COPY digital-assets-ui/package*.json ./
RUN npm install
COPY digital-assets-ui/ ./
RUN npm run build

# STAGE 2: Build .NET Backend
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-build
WORKDIR /src
COPY DigitalAssets.Api/*.csproj ./DigitalAssets.Api/
RUN dotnet restore ./DigitalAssets.Api/DigitalAssets.Api.csproj
COPY DigitalAssets.Api/ ./DigitalAssets.Api/
WORKDIR /src/DigitalAssets.Api
RUN dotnet publish -c Release -o /app/out

# STAGE 3: Final Image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=backend-build /app/out .
# Copy React build artifacts into the .NET wwwroot folder
COPY --from=frontend-build /src/dist ./wwwroot

EXPOSE 8080
ENTRYPOINT ["dotnet", "DigitalAssets.Api.dll"]