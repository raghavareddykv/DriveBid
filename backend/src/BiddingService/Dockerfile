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
COPY ["backend/src/BiddingService/BiddingService.csproj", "backend/src/BiddingService/"]
COPY ["backend/src/Contracts/Contracts.csproj", "backend/src/Contracts/"]
RUN dotnet restore "backend/src/BiddingService/BiddingService.csproj"
COPY . .
WORKDIR "/src/backend/src/BiddingService"
RUN dotnet build "./BiddingService.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./BiddingService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BiddingService.dll"]