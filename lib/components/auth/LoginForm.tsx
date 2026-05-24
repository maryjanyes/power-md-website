import { motion } from "framer-motion";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Button } from "@/lib/components/ui/button";
import { useState } from "react";
import { login } from "@/api/server-actions/user.actions";
import { toast } from "sonner";

const LabelComponent: any = Label;
const InputComponent: any = Input;
const ButtonComponent: any = Button;

export default function LoginForm() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        try {
            await login(loginData);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_e) {
            toast.error("Логін не вдався");
        }
    };

    return (
        <div className="p-5">
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
                <form className="flex flex-col gap-5">
                    <div className="space-y-2">
                        <LabelComponent className="text-xs font-mono text-muted-foreground">Email *</LabelComponent>
                        <InputComponent
                            value={loginData.email}
                            onChange={(e: any) => setLoginData((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))}
                            className="bg-secondary border-border font-mono"
                        />
                    </div>
                    <div>
                        <LabelComponent className="text-xs font-mono text-muted-foreground">Пароль *</LabelComponent>
                        <InputComponent
                            value={loginData.password}
                            onChange={(e: any) => setLoginData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))}
                            className="bg-secondary border-border font-mono"
                        />
                    </div>
                    <ButtonComponent
                        onClick={handleLogin}
                        disabled={!loginData.email || !loginData.password}
                        className="w-full h-12 bg-primary text-primary-foreground font-heading font-bold tracking-wider haptic-btn gap-2"
                    >
                        Увійти
                    </ButtonComponent>
                </form>
            </motion.div>
        </div> 
    );
};
