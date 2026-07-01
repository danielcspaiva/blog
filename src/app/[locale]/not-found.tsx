"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { BackToPrevious } from "@/components/BackToPrevious";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <Container>
      <div className="mt-16 grid place-items-center gap-3">
        <h4 className="animate show font-pixel text-2xl tracking-tight text-ink-950 dark:text-ink-50">
          {t("title")}
        </h4>
        <p className="animate show text-center">{t("message")}</p>
        <span className="animate show">
          <BackToPrevious href="/">{t("backHome")}</BackToPrevious>
        </span>
      </div>
    </Container>
  );
}
