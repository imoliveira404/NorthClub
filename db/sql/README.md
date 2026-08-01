# SQL do banco (para rodar em um Supabase próprio)

Cópias consolidadas e comentadas do schema da loja. Rode na ordem:

1. `01_products_roles_orders.sql` — enum `app_role`, tabela `user_roles`,
   função `has_role`, tabela `products`, tabela `orders`, triggers e índices.
2. `02_storage_product_images.sql` — bucket `product-images` e políticas de storage.

Depois de criar o primeiro usuário no Auth, promova-o a administrador:

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'seu-email@dominio.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

> As migrations já aplicadas neste projeto ficam em `supabase/migrations/`
> (geradas automaticamente). Estes arquivos são a versão organizada para
> reuso/portabilidade.
