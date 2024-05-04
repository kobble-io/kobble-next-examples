import {NextLogo} from "./NextLogo";
import {KobbleLogo} from "./KobbleLogo";

export const PoweredBy = () => {
    return (
        <div className="flex items-center justify-center pt-2">
            <div className="flex items-center justify-between gap-1 max-w-[200px]">
                <NextLogo />
                <span>+</span>
                <KobbleLogo />
            </div>
        </div>
    );
}