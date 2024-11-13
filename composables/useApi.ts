export const useApi = () => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()

  const fetchWithBase = async (endpoint: string, options: any = {}) => {
    const response = await $fetch(`${config.public.apiBase}${endpoint}`, {
      ...options,
      headers: {
        'Accept-Language': locale.value,
        ...options.headers
      }
    })
    return response
  }

  const generatePetName = async (filters: any) => {
    return await fetchWithBase('/generate', {
      method: 'POST',
      body: {
        ...filters,
        language: locale.value
      }
    })
  }

  const getNameDetail = async (slug: string) => {
    return await fetchWithBase(`/names/${slug}`)
  }

  const getNameHistory = async (page: number, perPage: number) => {
    return await fetchWithBase('/names/history', {
      params: { page, perPage }
    })
  }

  return {
    generatePetName,
    getNameDetail,
    getNameHistory
  }
} 