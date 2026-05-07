export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200/70 bg-zinc-900 text-zinc-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <img
              src="/er-logo.png"
              alt="Единая Россия"
              className="h-10 w-auto shrink-0"
              loading="lazy"
            />

            <div className="space-y-1">
              <div className="text-sm font-semibold text-zinc-50">
                Проекты Партии
              </div>
              <div className="text-sm text-zinc-300">
                ©{year}. Партия «Единая Россия».
              </div>
              <div className="text-sm text-zinc-300">
                Все права защищены.{' '}
                <a
                  href="#"
                  className="rounded-md underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  Политика конфиденциальности
                </a>
                .
              </div>
            </div>
          </div>

          <div className="max-w-3xl text-sm text-zinc-300">
            Продолжая находиться на данном сайте, вы соглашаетесь на предоставление
            информации об IP адресе, имени и стране домена провайдера, переходах с
            одной страницы на другую и cookies.
          </div>
        </div>

        <div className="mt-6 text-sm text-zinc-400">
          Разработано в{' '}
          <a
            href="#"
            className="rounded-md text-zinc-200 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            Кортекс
          </a>
        </div>
      </div>
    </footer>
  )
}

