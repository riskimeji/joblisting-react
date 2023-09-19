# Gunakan image Node.js sebagai base image untuk membangun aplikasi React
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json untuk menginstall dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh konten frontend
COPY . .

# Build aplikasi React
RUN npm run build

# Expose port yang digunakan oleh frontend
EXPOSE 3000

# Command untuk menjalankan frontend
CMD ["npm", "start"]
