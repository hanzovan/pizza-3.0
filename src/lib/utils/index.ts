import { OAuthProfile } from "@/types";

export function getRandomItems<T>(arr: T[], num: number) {
    // Shuffle the array
    const shuffle = arr

    for (let i = shuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }

    return shuffle.slice(0, num)
}

// Ensure user have strong password that have at least 8 characters including alphabet, uppercase, number, special character
export function strongPassword(password: string): boolean {
    const specialCharPattern = /[~!@#$%^&*()_+\[\]{}?]/;
    const hasSpecialChar = specialCharPattern.test(password);
    const hasNumber = /\d/.test(password);
    const hasAlphabet = /[a-zA-Z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const isLongEnough = password.length >= 8;
  
    const isValid =
      hasSpecialChar && hasNumber && hasAlphabet && hasUpperCase && isLongEnough;
  
    return isValid;
}

// Get user profile from providers like Github, Google, return info that matter
export const standardizeProfile = (profile: OAuthProfile) => {
    const id = profile.id ?? profile.sub ?? "profile id not found";
    const isBlocked = profile.isBlocked ?? false;
    const role = profile.role ?? "user";
    const emailIsVerified = profile.email_verified ?? false;
    const avatar = profile.avatar_url ?? profile.picture ?? "avatar not found"
    const createdAt = profile.created_at ?? new Date().toISOString();
    const updatedAt = profile.updated_at ?? new Date().toISOString();
    const credentialAccount = false;

    return {
        id,
        name: profile?.name,
        email: profile?.email,
        credentialAccount,
        role,
        isBlocked,
        emailIsVerified,
        avatar,
        createdAt,
        updatedAt
    }
}

export function dbTimeForHuman(str: string | undefined) {
    return str?.replace('T', ' ').substring(0, 16);
}