"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Textarea } from "@/lib/components/ui/textarea";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Package, CreditCard, Check, Loader2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createNewCartOrder } from "@/api/server-actions/cart.actions";
import { CartContext } from "@/lib/context/CartContext";
import { createUser, getUserByAttr } from "@/api/server-actions/user.actions";
import { confirmOrderSteps } from "@/lib/constants/website";

const ButtonComponent: any = Button;
const LabelComponent: any = Label;
const InputComponent: any = Input;
const TextareaComponent: any = Textarea;
const CheckboxComponent: any = Checkbox;

export default function CheckoutPage() {
  const { clearCart, cartItems } = useContext(CartContext);
  const [step, setStep] = useState(0);
  const [contactUserPhone, setContactUserPhone] = useState("");
  const [existsContactId, setExistsContactId] = useState<number>();
  const [rememberMyProfile, setRememberMyProfile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [shippingContactForm, setShippingContactForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    home_address: '',
    city: '',
    zip_code: '',
    country: '',
    notes: '',
  });

  const updateField = (fieldName: string, fieldValue: string) => setShippingContactForm((prev: any) => ({
    ...prev,
    [fieldName]: fieldValue,
  }));

  const contactFieldsFilled =
    shippingContactForm.full_name &&
    shippingContactForm.email &&
    shippingContactForm.home_address &&
    shippingContactForm.phone &&
    shippingContactForm.city &&
    shippingContactForm.country;
  const canProceed = step === 0
    ? contactFieldsFilled
    : true;

  const handleSubmit = async () => {
    setSubmitting(true);

    const values = {
      shippingContactInfo: shippingContactForm,
      items: cartItems,
    };
    await createNewCartOrder(values, existsContactId);
  
    if (rememberMyProfile) {
      await createUser({
        email: shippingContactForm.email,
        full_name: shippingContactForm.full_name,
        phone: shippingContactForm.phone,
        home_address: shippingContactForm.home_address,
        country: shippingContactForm.country,
        zip_code: shippingContactForm.zip_code,
        password: "",
      });
    }

    clearCart();
    setStep(2);
    setSubmitting(false);
    toast.success('Замовлення створене успішно!');
  };

  const handleLookupUserByPhone = async () => {
    const userInfo = await getUserByAttr('phone', contactUserPhone);

    if (!!userInfo) {
      setShippingContactForm({
        ...userInfo,
        notes: "",
        city: userInfo.city || "",
      } as any);
      setExistsContactId(userInfo!.id);
    }
  };

  if (cartItems.length === 0 && step < 2) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-mono text-muted-foreground text-sm mb-4">Корзина пуста</p>
          <Link href="/products">
            <ButtonComponent variant="outline" className="font-mono text-sm gap-2">
              <ArrowLeft className="w-4 h-4" />До списку товарів
            </ButtonComponent>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />Повернутись до каталогу
        </Link>

        <h1 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-2">Підтвердити замовлення</h1>
        <p className="font-mono text-sm text-muted-foreground mb-8">Кроки активації</p>

        <div className="flex items-center gap-2 mb-10">
          {confirmOrderSteps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono tracking-wider transition-all ${
                i <= step
                  ? 'border-primary/50 bg-primary/10 text-primary'
                  : 'border-border bg-card/30 text-muted-foreground'
              }`}>
                {i < step ? <Check className="w-3 h-3" /> : <span className="w-3 text-center">{i + 1}</span>}
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < confirmOrderSteps.length - 1 && (
                <div className={`w-8 h-px ${i < step ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-xl border border-border bg-card/40">
                <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />Контактна інформація про замовника
                </h2>
  
                <div className="flex flex-col md:flex-row! gap-2 md:items-center justify-between py-5">
                  <p className="text-xs w-auto md:w-[60%]!">
                    Вже купували раніше? Підтягнути профайл за номером телефону
                  </p>
                  <div className="flex flex-row justify-start w-auto md:w-[60%] items-center gap-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">Номер телефону *</LabelComponent>
                    <InputComponent
                      isSearch
                      handleSearch={handleLookupUserByPhone}
                      value={contactUserPhone}
                      onChange={(e: any) => {
                        setContactUserPhone(e.target.value);
                      }}
                      className="bg-secondary border-border font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">Повне імя *</LabelComponent>
                    <InputComponent value={shippingContactForm.full_name} onChange={(e: any) => updateField('full_name', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">Email *</LabelComponent>
                    <InputComponent type="email" value={shippingContactForm.email} onChange={(e: any) => updateField('email', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">Адреса доставки *</LabelComponent>
                    <InputComponent value={shippingContactForm.home_address} onChange={(e: any) => updateField('home_address', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">Місто *</LabelComponent>
                    <InputComponent value={shippingContactForm.city} onChange={(e: any) => updateField('city', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">ZIP код</LabelComponent>
                    <InputComponent value={shippingContactForm.zip_code} onChange={(e: any) => updateField('zip_code', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">Країна *</LabelComponent>
                    <InputComponent value={shippingContactForm.country} onChange={(e: any) => updateField('country', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">Телефон</LabelComponent>
                    <InputComponent value={shippingContactForm.phone} onChange={(e: any) => updateField('phone', e.target.value)} className="bg-secondary border-border font-mono" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <LabelComponent className="text-xs font-mono text-muted-foreground">Додатково</LabelComponent>
                    <TextareaComponent value={shippingContactForm.notes} onChange={(e: any) => updateField('notes', e.target.value)} className="bg-secondary border-border font-mono" rows={3} />
                  </div>
                </div>

                {!existsContactId && <div className="flex flex-row gap-2 items-center justify-between py-5">
                  <p className="font-semibold text-sm">
                    {"Запам'ятати мої контакти"}
                  </p>
                  <CheckboxComponent
                    name="rememberMyProfile"
                    value={rememberMyProfile}
                    onCheckedChange={(isChecked: boolean) => {
                      setRememberMyProfile(isChecked);
                    }}
                  />
                </div>}

                <ButtonComponent
                  onClick={() => setStep(1)}
                  disabled={!canProceed}
                  className="mt-10 w-full h-12 bg-primary text-primary-foreground font-heading font-bold tracking-wider haptic-btn gap-2"
                >
                  Підтвердити контакти<ArrowRight className="w-4 h-4" />
                </ButtonComponent>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-xl border border-border bg-card/40">
                <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />Загальна інформація
                </h2>
                <div className="divide-y divide-border/50">
                  {cartItems.map(item => (
                    <div key={item.product_id} className="flex items-center justify-between py-3 text-sm">
                      <div>
                        <p className="font-heading font-medium">{item.product_name}</p>
                        <p className="text-xs font-mono text-muted-foreground">Кількість: {item.quantity}</p>
                      </div>
                      <p className="font-mono text-primary font-semibold">
                        ₴{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">Вага: {cartItems.reduce((total, item) => total += (Number(item.weight) * item.quantity), 0)} кг.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-muted-foreground">Фінальна ціна</p>
                    <p className="text-2xl font-heading font-bold text-primary">₴{cartItems.reduce((total, item) => total += (item.price * item.quantity), 0)}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card/40">
                <p className="text-xs font-mono text-muted-foreground tracking-wider mb-3">Місце доставки</p>
                <p className="text-sm font-mono">{shippingContactForm.full_name}</p>
                <p className="text-sm font-mono text-muted-foreground">{shippingContactForm.home_address}</p>
                <p className="text-sm font-mono text-muted-foreground">{shippingContactForm.city} {shippingContactForm.zip_code}</p>
                <p className="text-sm font-mono text-muted-foreground">{shippingContactForm.country}</p>
              </div>

              <div className="flex gap-3">
                <ButtonComponent variant="outline" onClick={() => setStep(0)} className="flex-1 h-12 font-heading font-bold tracking-wider haptic-btn">
                  Повернутись
                </ButtonComponent>
                <ButtonComponent
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-2 h-12 bg-primary text-primary-foreground font-heading font-bold tracking-wider haptic-btn gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {submitting ? "створюємо..." : "Фіналізувати"}
                </ButtonComponent>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3">Замовлення підтверджено</h2>
              <p className="font-mono text-sm text-muted-foreground max-w-md mx-auto mb-8">
                Ваше замовлення успішно підтверджено. Погодження відправлене на пошту {shippingContactForm.email}.
              </p>
              <Link href="/products">
                <ButtonComponent className="bg-primary text-primary-foreground font-heading font-bold tracking-wider haptic-btn gap-2">
                   <ArrowRight className="w-4 h-4" />
                </ButtonComponent>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
