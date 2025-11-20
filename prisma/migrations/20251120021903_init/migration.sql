-- CreateTable
CREATE TABLE "habitos" (
    "id_habito" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "hora" TIME(6) NOT NULL DEFAULT CURRENT_TIME,
    "completado" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dia_semana" TEXT,

    CONSTRAINT "habitos_pkey" PRIMARY KEY ("id_habito")
);

-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "habitos" ADD CONSTRAINT "habitos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
