# Utiliza una imagen oficial de Node.js para Next.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json* ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Next.js
RUN npm run build

# Expone el puerto por defecto de Next.js
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]