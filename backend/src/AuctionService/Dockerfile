FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive \
    apt-get install --no-install-recommends --assume-yes \
      protobuf-compiler-grpc
ENV PROTOBUF_PROTOC=/usr/bin/protoc
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["backend/src/AuctionService/AuctionService.csproj", "backend/src/AuctionService/"]
COPY ["backend/src/Contracts/Contracts.csproj", "backend/src/Contracts/"]
COPY ["backend/tests/AuctionService.Tests.Unit/AuctionService.Tests.Unit.csproj", "backend/tests/AuctionService.Tests.Unit/"]
COPY ["backend/tests/AuctionService.Tests.Integration/AuctionService.Tests.Integration.csproj", "backend/tests/AuctionService.Tests.Integration/"]
RUN dotnet restore "backend/src/AuctionService/AuctionService.csproj"
COPY . .
WORKDIR "/src/backend/src/AuctionService"
RUN dotnet build "./AuctionService.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AuctionService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuctionService.dll"]