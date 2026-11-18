"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { BackToPrevious } from "@/components/BackToPrevious";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <Container>
      <div className="mt-10 grid place-items-center gap-5 text-center">
        <p
          aria-hidden="true"
          className="wordmark text-ink text-8xl leading-none tracking-tight sm:text-9xl"
        >
          404
        </p>
        <h1 className="plate">{t("title")}</h1>
        <p className="text-ink-muted">{t("message")}</p>
        <BackToPrevious href="/">{t("backHome")}</BackToPrevious>
      </div>
    </Container>
  );
}
