FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["backend/src/SearchService/SearchService.csproj", "backend/src/SearchService/"]
COPY ["backend/src/Contracts/Contracts.csproj", "backend/src/Contracts/"]
RUN dotnet restore "backend/src/SearchService/SearchService.csproj"
COPY . .
WORKDIR "/src/backend/src/SearchService"
RUN dotnet build "./SearchService.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./SearchService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SearchService.dll"]
