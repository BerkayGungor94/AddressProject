#!/bin/bash
set -e

# === Config ===
BACKEND_DIR="/Users/berkaygungor/IdeaProjects/AddressProject"       # Spring Boot projesi klasörü
FRONTEND_DIR="/Users/berkaygungor/IdeaProjects/AddressProject/src/main/frontend/address-viewer"     # React projesi klasörü
TARGET_DIR="/opt/Addressproject/frontend"   # Sunucuda Nginx'in servis ettiği klasör
JAR_NAME="demo-0.0.1-SNAPSHOT.jar"  # Maven build sonrası oluşan jar ismi


echo "=== Backend build başlıyor ==="
cd $BACKEND_DIR
mvn clean install -DskipTests
cd ..

echo "=== Frontend build başlıyor ==="
cd $FRONTEND_DIR
npm run build
cd ..

echo "=== Yeni frontend build kopyalanıyor ==="
scp -r $FRONTEND_DIR/build/* ubuntu@13.61.35.238:$TARGET_DIR/

echo "=== Backend jar kopyalanıyor ==="
scp $BACKEND_DIR/target/$JAR_NAME ubuntu@13.61.35.238:/opt/AddressProject/$JAR_NAME

echo "✅ Deploy tamamlandı!"
